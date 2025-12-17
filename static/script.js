
const filterDataValues = {
  strats: getTags(data, 'strategy'),
  bossList: [
    "Bellanoir",
    "Bellanoir Libero",
    "Bellanoir Libero Ultra",
    "Blazamut Ryu",
    "Blazamut Ryu Ultra",
    "Xenolord",
    "Xenolord Ultra",
    "Moon Lord",
    "Moon Lord Master",
    "Hartalis",
    "Hartalis Ultra",
  ],
  towerList: [
    "Zoe & Grizzbolt (Hard)",
    "Lily & Lyleen (Hard)",
    "Axel & Orserk (Hard)",
    "Marcus & Faleris (Hard)",
    "Victor & Shadowbeak (Hard)",
    "Saya & Selyne (Hard)",
    "Bjorn & Bastigor (Hard)",
  ]
}

function getTags(data, attr) {
  return new Set(data.map(entry => entry[attr]).flat().filter(v => !!v))
}

const filterBoss = (boss) => {
  const sbprev = table.searchBuilder.getDetails()
  const prevCriterias = sbprev?.criteria?.filter(c => !(c.data === "Boss" && c.condition === "is")) ?? []
  const sbValue = {
    logic: "AND",
    criteria: [
      ...prevCriterias.map(c=>({ ...c, origData: "button" })),
      {
        condition: "is",
        origData: "button", // This attribute is required to validate the entry (see "sbObj.s.origData" in isInputValid)
        data: "Boss",
        type: "boss",
        value: [ boss ]
      }
    ]
  }
  table.searchBuilder.rebuild(sbValue)
}

//table.columns(1).search((val, row, index, col) => val === boss).draw()
/**
   * An other way consists of rebiulding the searchBuilder with a predefined search but it doesn't work well
  ```
  table.searchBuilder.rebuild({
    "logic": "AND",
    "criteria": [
      {
        "condition": "=",
        "data": "Boss",
        "type": "string",
        "value": [
          boss
        ]
      }
    ]
  }) 
  ```
*/

createGroupingFn = (column) => () => table.order([{ name: column, dir: 'asc'}]).rowGroup().dataSrc(column).rowGroup().enable().draw()
createSortingFn = (column) => () => table.order([{ name: column, dir: 'asc'}])


const viewList = [
  { label: "Group by player", fn: createGroupingFn("player") },
  { label: "Group by bosses", fn: createGroupingFn("boss") },
  { label: "Group by version", fn: createGroupingFn("game_version") },
]

/** ordering
 * timer
 * version
 * date
 */

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
  const el = $('<select/>') //document.createElement('select');
  el.addClass("dtsb-value")
    .addClass("dtsb-dropDown")
    .addClass("dtsb-select")
  data.forEach(strat => {
    const stratOption = $('<option/>').val(strat).text(strat) //document.createElement('option')
    //stratOption.value = strat
    //stratOption.text = strat
    el.append(stratOption)
  })
  return el
}

function optionFilterInit(data) {
  return (that, fn, preDefined = null) => {
    const el = createOptionFilter(data)
      .on('input', () => fn(that, this)).val(null);
    //el.addEventListener('input', () => fn(that, this));
    $(el).val('')
    return el;
  }
}


function getImageUrl(raidName) {
  if (raidName === 'Bellanoir')
    return "https://images.squarespace-cdn.com/content/68bd6b47bbd3f202164db779/25c049ed-502e-4bce-9107-49d3e30745ea/bellanoir.webp?content-type=image%2Fwebp"
  if (raidName.startsWith('Bellanoir Libero'))
    return "https://images.squarespace-cdn.com/content/68bd6b47bbd3f202164db779/4b9f2ec1-e369-4a3c-8fcb-8e26a72cf3c0/libero.webp?content-type=image%2Fwebp"
  if (raidName.startsWith('Blazamut Ryu'))
    return "https://images.squarespace-cdn.com/content/68bd6b47bbd3f202164db779/eef5663d-5524-4166-bfae-b974d5137c1c/T_KingBahamut_Dragon_icon_normal.webp?content-type=image%2Fwebp"
  if (raidName.startsWith("Xenolord"))
    return "https://images.squarespace-cdn.com/content/68bd6b47bbd3f202164db779/fa711866-1e06-492e-81eb-b1660151bd03/T_DarkMechaDragon_icon_normal.webp?content-type=image%2Fwebp"
  if (raidName.startsWith('Moon Lord'))
    return "https://images.squarespace-cdn.com/content/68bd6b47bbd3f202164db779/1b59726a-ba71-49a8-b4ff-80c3dbf76f2c/moonlord.png?content-type=image%2Fpng"
  if (raidName.startsWith('Hartalis'))
    return "https://palworld-raids.github.io/palworld-raids/static/img/pals/T_LegendDeer_icon_normal.webp" // TODO: Replace this GH url by SQS CDN URL

  if (raidName.startsWith("Zoe & Grizzbolt"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_0.webp" // TODO: Replace this GH url by SQS CDN URL
  if (raidName.startsWith("Lily & Lyleen"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_1.webp" // TODO: Replace this GH url by SQS CDN URL
  if (raidName.startsWith("Axel & Orserk"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_2.webp" // TODO: Replace this GH url by SQS CDN URL
  if (raidName.startsWith("Marcus & Faleris"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_3.webp" // TODO: Replace this GH url by SQS CDN URL
  if (raidName.startsWith("Victor & Shadowbeak"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_4.webp" // TODO: Replace this GH url by SQS CDN URL
  if (raidName.startsWith("Saya & Selyne"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_5.webp" // TODO: Replace this GH url by SQS CDN URL
  if (raidName.startsWith("Bjorn & Bastigor"))
    return "https://palworld-raids.github.io/palworld-raids/static/img/tower/banner/T_map_boss_banner_6.webp" // TODO: Replace this GH url by SQS CDN URL
  
  return undefined
}

function buildRaidLink(raid, videoLink) {
  const imgUrl = getImageUrl(raid)
  const link = document.createElement('a')
  const textSpan = document.createElement('span')
  
  link.href = videoLink
  textSpan.innerText = raid

  /* 
  TO BE IMPLEMENTED
  if (imgUrl) {
    const img = document.createElement('img')
    img.src = imgUrl
    link.appendChild(img)
  } 
  */

  link.appendChild(textSpan)
  
  return link
}

function createDepictedFilterButton(boss) {
  const bossOptionButton = document.createElement('button')
  bossOptionButton.setAttribute('data-value', boss)
  // Image
  const img = document.createElement('img')
  img.src = getImageUrl(boss)
  // Text
  const text = document.createElement('span')
  text.innerText = boss
  bossOptionButton.appendChild(img)
  bossOptionButton.appendChild(text)
  bossOptionButton.addEventListener('click', () => filterBoss(boss))
  return bossOptionButton
}

function createCustomFilters() {
  const customFiltersContainer = document.createElement('dialog')
  customFiltersContainer.id = 'filter-dialog'
  customFiltersContainer.setAttribute("closedby", "any")

  const selectBossButtonGroup = document.createElement("section")
  selectBossButtonGroup.setAttribute("data-filter", "boss")
  const selectBossButtonGroupSummary = document.createElement('div')
  selectBossButtonGroupSummary.innerText = 'Raid bosses'
  selectBossButtonGroup.appendChild(selectBossButtonGroupSummary)

  const selectTowerButtonGroup = document.createElement("section")
  selectTowerButtonGroup.setAttribute("data-filter", "tower")
  const selectTowerButtonGroupSummary = document.createElement('div')
  selectTowerButtonGroupSummary.innerText = 'Tower bosses'
  selectTowerButtonGroup.appendChild(selectTowerButtonGroupSummary)

  filterDataValues.bossList.forEach(boss => selectBossButtonGroup.appendChild(createDepictedFilterButton(boss)))
  filterDataValues.towerList.forEach(boss => selectTowerButtonGroup.appendChild(createDepictedFilterButton(boss)))

  customFiltersContainer.appendChild(selectBossButtonGroup)
  customFiltersContainer.appendChild(selectTowerButtonGroup)

  return customFiltersContainer
}

function createSearchBuilderContainer() {
  const customFiltersContainer = document.createElement('dialog')
  customFiltersContainer.id = "search-dialog"
  customFiltersContainer.setAttribute("closedby", "any")
  customFiltersContainer.setAttribute("data-filter", "custom")
  return customFiltersContainer
}

document.body.appendChild(createCustomFilters())
document.body.appendChild(createSearchBuilderContainer())

let table = new DataTable('#records', {
  data: data,
  //rowGroup: { dataSrc: 'raid' },
  columns: [
    {
      target: 0,
      data: "player",
      title: "Player",
      className: "records--player",
    },
    {
      target: 1,
      data: "raid",
      title: "Boss",
      type: 'boss',
      className: "records--raid",
      data: function (row, type, val, meta) {
        switch (type) {
          case 'display':
            return buildRaidLink(row.raid, row.video_link)
          default: // 'filter','set','sort','type',
            console.log(`Table: "${type}" data for row: ${row.raid}`, row, val, meta)
            return row.raid
        }
      }
    },
    {
      target: 2,
      data: "pals",
      title: "Pals",
      className: "records--pals",
    },
    {
      target: 3,
      type: 'strategy',
      title: "Strategy type",
      data: function (row, type, val, meta) {
          switch (type) {
            case 'display':
              return respanData(row.strategy)
            default: // 'filter','set','sort','type',
              break;
          }
          //console.log(`Table: "${type}" data for row: ${row.strat}`, row, val, meta)
          return row.strategy
        },
      className: "records--strategy",
    },
    {
      target: 4,
      data: "timer",
      //type: 'timer',
      title: "Timer",
      data: function (row, type, val, meta) {
          switch (type) {
            case 'display':
              return row.timer.slice(2)
            default: // 'filter','set','sort','type',
              break;
          }
          //console.log(`Table: "${type}" data for row: ${row.strat}`, row, val, meta)
          return row.strategy
        },
      className: "records--timer dt-type-numeric",
    },
    {
      target: 5,
      data: "game_version",
      title: "Version",
      className: "records--game-version dt-type-numeric",
    },
    {
      target: 6,
      data: "submit_date",
      type: 'date',
      title: "Submit date",
      className: "records--submit-date",
    },
    {
      target: 7,
      data: "review_date",
      type: 'date',
      title: "Review date",
      className: "records--review-date",
    }
  ],
  layout: {
    topStart: null,
    topEnd: null,
    top: [ 
      { 
        buttons: [    
          {
            text: "Predefined filters",
            action: () => document.getElementById("filter-dialog").showModal()
          },
          {
            text: "Custom filters",
            action: () => document.getElementById("search-dialog").showModal()
          }
        ] 
      }, 
      { search: { text: '', placeholder: 'Search' } }, 
      "paging"
    ],
    bottomStart: "pageLength",
    bottomEnd: "paging",
  },
});

const validateInputEnum = (el, sbObj) => {
  const value = $(el[0]).val()
  console.log(sbObj)
 
  if (sbObj.s.origData === "button") {
    $(el[0]).val(sbObj.s.value[0])
    return true
  } 
  
  if (!value)
    return false

  return value.length !== 0; 
}
const validateInputEnumInData = (el, sbObj) => {
  const value = $(el[0]).val()
  
  if (sbObj.s.reset > 1) {
    sbObj.s.origData = undefined
    sbObj.s.reset = 0
  }
  
  if (sbObj.s.origData === "button") { 
    // This is used to set the input value when the entry uses rebuild() feature
    $(el[0]).val(sbObj.s.value[0])
    if (sbObj.s.reset > 0)
      sbObj.s.reset++
    else
      sbObj.s.reset = 1
    return true
  }

  if (!value)
    return false

  return filterDataValues.bossList.includes(value) || filterDataValues.towerList.includes(value); 
}

new DataTable.Buttons(table, {
  buttons: [
    {
      extend: 'searchBuilder',
      config: {
        //columns: [0, 1, 2, 3, 4],
        conditions: {
          strategy: {
            contains: {
              conditionName: 'Contains', // String value that will be displayed in the condition select element
              init: optionFilterInit(filterDataValues.strats),
              inputValue: function (el) { return $(el[0]).val(); },
              isInputValid: validateInputEnum,
              search: function (value, comparison) { return value.includes(comparison) }
            },
            doesNotContain: {
              conditionName: 'Does not contain', // String value that will be displayed in the condition select element
              init: optionFilterInit(filterDataValues.strats),
              inputValue: function (el) { return $(el[0]).val(); },
              isInputValid: validateInputEnum,
              search: function (value, comparison) { return !value.includes(comparison) }
            },
            is: {
              conditionName: 'Is', // String value that will be displayed in the condition select element
              init: function (that, fn, preDefined = null) {
                var el = document.createElement('select');
                ["Empty", "Not empty"].forEach(value => {
                  const filterOption = document.createElement('option')
                  filterOption.value = value
                  filterOption.text = value
                  el.appendChild(filterOption)
                });
                el.value = '';
                el.addEventListener('input', () => fn(that, this));
                return el
              },
              inputValue: function (el) { 
                return $(el[0]).val(); 
              },
              isInputValid: validateInputEnum,
              search: function (value, comparison) { 
                console.log("Comparing ", value, comparison)
                return comparison.includes('Empty') ? !value.length : comparison.includes('Not empty') ? !!value.length : true }
            }
          },
          boss: {
            is: {
              conditionName: 'Is', // String value that will be displayed in the condition select element
              init: optionFilterInit([filterDataValues.bossList, filterDataValues.towerList].flat()),
              inputValue: function (el) { return $(el[0]).val(); },
              isInputValid: validateInputEnumInData,
              search: function (value, comparison) { return value === comparison[0] }
            },
            isNot: {
              conditionName: 'Is not', // String value that will be displayed in the condition select element
              init: optionFilterInit([filterDataValues.bossList, filterDataValues.towerList].flat()),
              inputValue: function (el) { return $(el[0]).val(); },
              isInputValid: validateInputEnumInData,
              search: function (value, comparison) { return !value === comparison[0] }
            },
          }
        }
      }
    },
    {
      text: "Predefined filters",
      action: () => console.log("predefil")
    }
  ]
});

table.searchBuilder.container().appendTo('#search-dialog')

