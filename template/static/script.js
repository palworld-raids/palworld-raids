
function unspanData(data) {
  const regex = /(<span>(\w+(\s+\w+)*)<\/span>)+/g;
  const dataArray = []
  while ((m = regex.exec(data.replace('\n',''))) !== null) {
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      dataArray.push(m[2])
  }
  return dataArray
}
function respanData(data) {
  return data.map(strat => `<span>${strat}</span>`).join('')
}
function createOptionFilter(data) {
  var el = document.createElement('select');
  data.forEach(strat => {
    const stratOption = document.createElement('option')
    stratOption.value = strat
    stratOption.text = strat
    el.appendChild(stratOption)
  })
  return el
}
function optionFilterInit(that, fn, preDefined = null) {
  var el = createOptionFilter(filterDataValues.strats)
  el.addEventListener('input', function () {
    fn(that, this);
  });
  el.value = ''
  return el;
}

const filterDataValues = {
  strats: [
    "Player Damage",
    "Pal Pods or Rescue Pals",
    "Glitches or Exploits",
  ],
  bosses: [
    "Zoe & Grizzbolt (Hard)",
    "Lily & Lyleen (Hard)",
    "Axel & Orserk (Hard)",
    "Marcus & Faleris (Hard)",
    "Victor & Shadowbeak (Hard)",
    "Saya & Selyne (Hard)",
    "Bjorn & Bastigor (Hard)",
    "Bellanoir",
    "Bellanoir Libero",
    "Bellanoir Libero Ultra",
    "Blazamut Ryu",
    "Blazamut Ryu Ultra",
    "Xenolord",
    "Xenolord Ultra",
    "Moon Lord",
    "Moon Lord Master",
  ]
}

let table = new DataTable('#myTable', {
    layout: {
        topStart: {
            searchBuilder: {
                columns: [0, 1, 2, 3, 4],
                conditions: {
                    strat: {
                        Contains: {
                            conditionName: 'Contains', // String value that will be displayed in the condition select element
                            init: optionFilterInit,
                            inputValue: function (el) { return el[0].value; },
                            isInputValid: function (el, that) { return el[0].value.length !== 0; },
                            search: function (value, comparison) { return value.includes(comparison) }
                        },
                        DoesNotContain: {
                            conditionName: 'Does not contain', // String value that will be displayed in the condition select element
                            init: optionFilterInit,
                            inputValue: function (el) { return el[0].value; },
                            isInputValid: function (el, that) { return el[0].value.length !== 0; },
                            search: function (value, comparison) { return !value.includes(comparison) }
                        },
                        is: {
                          conditionName: 'is', // String value that will be displayed in the condition select element
                          init: function optionFilterInit(that, fn, preDefined = null) {
                            var el = document.createElement('select')
                            data.forEach(strat => {
                              const stratOption = document.createElement('option')
                              stratOption.value = strat
                              stratOption.text = strat
                              el.appendChild(stratOption)
                            })
                            return el
                          },
                          inputValue: function (el) { return el[0].value; },
                          isInputValid: function (el, that) { return el[0].value.length !== 0; },
                          search: function (value, comparison) { return !!value.length }
                        }
                    }
                }
            }
        }
    },
    columnDefs: [
        {
            targets: 4,
            type: 'strat',
            data: function (row, type, val, meta) {
                switch (type) {
                  case 'set':
                    row.strat = unspanData(val)
                    break;
                  case 'display':
                    return respanData(row.strat)
                  case 'filter':
                    break;
                  case 'sort':
                    break;
                  case 'type':
                    break;
                  default:
                    break;
                }
                //console.log(`Table: "${type}" data for row: ${row.strat}`, row, val, meta)
                return row.strat ? row.strat : ''
            }
        }
    ]
});