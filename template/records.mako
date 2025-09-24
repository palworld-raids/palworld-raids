<style>
.dt-container { container-type: inline-size; }

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td, th {
    padding: 8px;
    @container (width < 748px) { 
      text-align: left !important;
      &:before { 
        font-weight: 700; 
      } 
    }
  }
  
  tr:nth-child(even) {
    background-color: #1112;
  }

  th {
    font-weight: 600;
  }

  [data-player] {
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        grid-area: player;
        &:before { content: 'Player: ' }
      }
    }
  }
  [data-game-version] {
    text-align: right !important;
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        text-align: left !important;
        grid-area: game-version;
        &:before { content: 'Version: ' }
      }
    }
  }
  [data-raid] {
    &:is(th) {}
    &:is(td) {
      a { text-decoration: underline #FFFFFF; }
      img {
        aspect-ratio: 1;
        width: 1.2em;
        vertical-align: bottom;
      }
      @container (width < 748px) {
        grid-area: raid;
        &:before { content: 'Raid: ' }
      }
    }
  }
  [data-pals] {
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        grid-area: pals;
        &:before { content: 'Pals: ' }
      }
    }
  }
  [data-strategy] {
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        grid-area: strategy;
        &:before { content: 'Strategy: ' }
      }
      span {
        border-radius: 12px;
        border: 1px solid #495057;
        background-color: #495057AA;
        padding: 0.25em 0.5em;
        white-space: nowrap;
      }
    }
  }
  [data-timer] {
    text-align: center !important;
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        text-align: left !important;
        grid-area: timer;
        &:before { content: 'Timer: ' }
      }
    }
  }
  [data-submit-date] {
    text-align: right !important;
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        text-align: left !important;
        grid-area: submit-date;
        &:before { content: 'Submit date: ' }
      }
    }
  }
  [data-review-date] {
    text-align: right !important;
    &:is(th) {}
    &:is(td) {
      @container (width < 748px) {
        text-align: left !important;
        grid-area: review-date;
        &:before { content: 'Review date: ' }
      }
    }
  }

  tfoot {
    font-size: 0.6em;
    color: #8888;
    td { text-align: right !important; }
  }

  @container (width < 748px) { 
    &, tbody, td {
      display: block; 
    }
    td {
      padding: 0.125em 0.5em;
    }
    tbody tr {
      background-color: #1112;
      border: 1px solid white;
      display: grid;
      margin-block: 1.5em;
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 
        "player player raid raid"
        "pals pals timer timer"
        "strategy strategy strategy strategy"
        "game-version game-version game-version game-version"
        "submit-date submit-date review-date review-date" 
      ;
    }
    thead, th { 
      display: none; 
    }
  }
}


</style>
<table id="myTable">
    <thead>
        <tr>                         
            <th data-player>Player</th>
            <th data-game-version>Version</th>
            <th data-raid>Raid</th>
            <th data-pals>Pals</th>
            <th data-strategy>Strategy type</th>
            <th data-timer>Timer</th>
            <th data-submit-date>Submit date</th>
            <th data-review-date>Review date</th>
        </tr>
    </thead>
    <tbody>
    % for record in records:
    % if record['review_date'] and record['reviewer'] and record['timer']:
    <tr>
        <td data-player>${record['player']}</td>
        <td data-game-version>${record['game_version']}</td>
        <td data-raid><a href="${record['video_link']}" target="_blank" noreferrer/>${record['raid']}</a></td>
        <td data-pals>${record['pals']}</td>
        <td data-strategy>
            % for uses in record['strategy']:
            <span>${uses}</span>
            % endfor
        </td>
        <td data-timer>${record['timer']}</td>
        <td data-submit-date>${record['submit_date']}</td>
        <td data-review-date>${record['review_date']}</td>
    </tr>
    % endif
    % endfor
    </tbody>
    <tfoot>
        <tr>
            <td colspan="8">Last publishing date: ${publish_date}</td>
        </tr>
    </tfoot>
</table>

<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/2.3.4/css/dataTables.dataTables.css" />
<script src="https://cdn.datatables.net/2.3.4/js/dataTables.js"></script>
<script>
let table = new DataTable('#myTable', {
    // options
});
</script>