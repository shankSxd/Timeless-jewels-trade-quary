const TimelessJewels = {
1: 'Glorious Vanity',
2: 'Lethal Pride',
3: 'Brutal Restraint',
4: 'Militant Faith',
5: 'Elegant Hubris'
}

const tradeStatNames = {
1: {
    Ahuana: 'explicit.pseudo_timeless_jewel_ahuana',
    Xibaqua: 'explicit.pseudo_timeless_jewel_xibaqua',
    Doryani: 'explicit.pseudo_timeless_jewel_doryani'
},
2: {
    Kaom: 'explicit.pseudo_timeless_jewel_kaom',
    Rakiata: 'explicit.pseudo_timeless_jewel_rakiata',
    Akoya: 'explicit.pseudo_timeless_jewel_akoya'
},
3: {
    Balbala: 'explicit.pseudo_timeless_jewel_balbala',
    Asenath: 'explicit.pseudo_timeless_jewel_asenath',
    Nasima: 'explicit.pseudo_timeless_jewel_nasima'
},
4: {
    Maxarius: 'explicit.pseudo_timeless_jewel_maxarius',
    Dominus: 'explicit.pseudo_timeless_jewel_dominus',
    Avarius: 'explicit.pseudo_timeless_jewel_avarius'
},
5: {
    Cadiro: 'explicit.pseudo_timeless_jewel_cadiro',
    Victario: 'explicit.pseudo_timeless_jewel_victario',
    Caspiro: 'explicit.pseudo_timeless_jewel_caspiro'
}
};

const maxQueries = 65;
const constructQuery = (jewel, conqueror, result) => {
  let seeds = [];

  for (const r of result) {
    if (seeds.length >= maxQueries) {
      break;
    }
    seeds.push(r);
  }

  let stats;
// seeds.length * 3 < maxQueries
  if (true) {
    stats = [
      {
        type: 'count',
        value: {
          min: 1
        },
        filters: Object.keys(tradeStatNames[jewel])
          .map((c) =>
            seeds.map((seed) => ({
              id: tradeStatNames[jewel][c],
              disabled: false,
              value: {
                min: seed,
                max: seed
              }
            }))
          )
          .flat(),
        disabled: false
      }
    ];
  } 
  // else {
  //   stats = Object.keys(tradeStatNames[jewel]).map((c) => ({
  //     type: 'count',
  //     value: {
  //       min: 1
  //     },
  //     filters: seeds.map((seed) => ({
  //       id: tradeStatNames[jewel][c],
  //       disabled: false,
  //       value: {
  //         min: seed,
  //         max: seed
  //       }
  //     })),
  //     disabled: c != conqueror
  //   }));
  // }

  return {
    query: {
      status: {
        option: 'online'
      },
      name: TimelessJewels[jewel],
      type: 'Timeless Jewel',
      stats
    },
    sort: {
      price: 'asc'
    }
  };
};


                // jewel to int który oznacza nazwe jewela np: 2 - lethal pride
                //        conqueror to string z nazwą conquerora np: Kaom
                //                   results to jest array seedów np: 11557
const openTrade = (jewel, conqueror, results) => {
    const url = new URL('https://www.pathofexile.com/trade/search/Sentinel');
    url.searchParams.set('q', JSON.stringify(constructQuery(jewel, conqueror, results)));
    window.open(url, '_blank');
  };

function parsingform()
{
  const jewel = document.getElementById('jewel').value
  const conq = document.getElementById('conq').value
  const x = document.getElementById('seeds').value
  let seeds = []
  let y = JSON.parse("[" + x + "]");
  y[0].forEach(element => {
      seeds.push(element)
  });
  openTrade(Number(jewel), conq, seeds)
}

