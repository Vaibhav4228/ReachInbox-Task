import { Client } from "@elastic/elasticsearch";


const elastic = new Client({
    node: process.env.ELASTICSEARCH_NODE || "http://localhost:9200",
});

export const searchEmails = async (req, res) => {
    try{

        const { query, folder, account, category, page = 1, limit = 10 } = req.query;

        const must=[];

        if (query){
            must.push({
                multi_match: {
                    query,
                    fields: ["subject", "body", "from", "to"],
                    fuzziness: 'AUTO',
                },
            })
        }

        if(folder)must.push({ match: { folder } });
        if(account)must.push({ match: { account } });
        if(category)must.push({ match: { category } });

        const from = (page - 1) * limit;

        const response = await elastic.search({
            index: "emails",
            body: {
                query: {
                    bool: {
                        must,
                    },
                },
                from,
                size: limit,
                query: {
                    bool: {
                        must
                    }
                }
            },
        });

        const hits = response.hits.hits.map(hit => hit._source);

        res.status(200).json({
            total: response.hits.total.value,
      results: hits,
        });

    } catch (error) {
        console.error("Error searching emails:", error.message);
        res.status(500).json({ message: "Error searching emails" });
    }
}