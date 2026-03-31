/*
Process incoming request and return to caller
*/

export default async function handler(req, res) {

    const data = [
        {
            "month": "Oct",
            "revenue": 38400,
            "expenses": 29100,
            "units": 284
        },
        {
            "month": "Nov",
            "revenue": 41200,
            "expenses": 31400,
            "units": 306
        },
        {
            "month": "Dec",
            "revenue": 52800,
            "expenses": 38200,
            "units": 391
        },
        {
            "month": "Jan",
            "revenue": 35100,
            "expenses": 27800,
            "units": 260
        },
        {
            "month": "Feb",
            "revenue": 39600,
            "expenses": 30100,
            "units": 294
        },
        {
            "month": "Mar",
            "revenue": 47300,
            "expenses": 33500,
            "units": 351
        }
    ];



    // Now return the data
    return res.status(200).json(data);

}


