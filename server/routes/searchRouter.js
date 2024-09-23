import express from 'express';
import sql from 'mssql';
// import config from '../config.js';

const router = express.Router();

router.get('/Search', async (req, res) => {
    try {
        const { callingNo, dialedNo, inum, callType, globalSearch } = req.query;

        let query = "SELECT * FROM Recordings WHERE 1=1";

        if (callingNo) {
            query += " AND core_callingparty = @callingNo";
        }
        if (dialedNo) {
            query += " AND core_calledparty = @dialedNo";
        }
        if (inum) {
            query += " AND inum = @inum";
        }
        if (callType) {
            query += " AND isInComing = @callType";
        }
        if (globalSearch) {
            query += ` AND (core_callingparty LIKE '%' + @globalSearch + '%' OR inum LIKE '%' + @globalSearch + '%' OR isInComing LIKE '%' + @globalSearch + '%')`; // OR CONVERT(DATE, call_date) LIKE '%' + @globalSearch + '%'
        }

        const pool = await sql.connect(config);
        const request = pool.request();

        if(callingNo){
            request.input('CallingNo', sql.NVarChar, callingNo);
        }
        if(dialedNo){
            request.input('DialedNo', sql.NVarChar, dialedNo);
        }
        if(inum){
            request.input('Inum', sql.NVarChar, inum);
        }
        if(callType){
            request.input('CallType', sql.NVarChar, callType);
        }
        if(globalSearch){
            request.input('GlobalSearch', sql.NVarChar, globalSearch);
        }

        const result = await request.query(query);
        res.send({ recordingsData: result.recordset });

    } catch (error) {
    console.error('Error searching recordings: ', error);
    res.status(500).send({ error: 'Error searching recordings!' });
  }
});

export default router;
