const express = require('express');
const helloRouter = express.Router();
const fetch = require('node-fetch');
// const _s = 'FRLG,PPLL,SRTY,CNBW,TZA,DIVC,QID,ERY,SPXS,SDOW,SMDD,STRT,SPXU,FAZ,LABD,DRIP,DUST,DUG,GDXD,CEE,WMC,BNKD,JDST,UVXY,LWAY,BIVI,RFIL,MSC,MYSZ,CJJD,LYRA,IMNM,IPHA,CALA,WAFU,GLT,DWSN,FREQ,FCNE,OLMA,AGMH,CWBR,YQ,ARDX,KINS,UK,ANTE,RGS,NMTR,PFIE';

helloRouter.get('', async (req, res) => {
  const s = req.query.s;
  // console.log(s);
  const response = fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols='+ s , {
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });

  const data = await response;
  const _data = await data.json();
  res.send(_data);
})

module.exports = helloRouter;