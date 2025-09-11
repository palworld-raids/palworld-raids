<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
  font-weight: 600;
}

td, th {
  text-align: left;
  padding: 8px;

  
  /**  This is the Level column (3rd) */
  &:nth-child(5), &:nth-child(7) {
    text-align: center;
  }

  &:nth-child(4) {
    img {
      aspect-ratio: 1;
      width: 1.2em;
      vertical-align: bottom;
    }
  }
  
  /**  This is the "HP", "Damage Multiplier" and "Damage Reduction" columns (5th, 6th and 7th respectively) */
  &:nth-child(5), &:nth-child(6), &:nth-child(8) {
    text-align: right
  }
}

tr:nth-child(even) td {
  background-color: #1112;
}

td { 
  border-top: 1px solid #495057; 
  /** This is the Boss name column (which has no label) */
  &:nth-child(2) {
    font-weight: 600;
    text-decoration: underline #8888;
  }
}

/** This is the Raid row, the one with the link */
tr[data-raid] {
  background-color: #3331;
  td { border-top: 1px solid #495057; }
}

tr[data-raid-info] {
  background-color: #1112;
  img {
    aspect-ratio: 1;
    width: 1.2em;
    vertical-align: bottom;
  }
}

td[data-strategy] span {
    border-radius: 8px;
    padding: 2px;
    border: 1px solid #8888;
    background-color: #8884;
}

tfoot {
    font-size: 0.6em;
    color: #8888;
    td { text-align: right; }
}
</style>
<table>
    <thead>
        <tr>                         
            <th>Player</th>
            <th>Raid</th>
            <th>Pals</th>
            <th>Strategy type</th>
            <th>Timer</th>
            <th>Submit date</th>
            <th>Review date</th>
        </tr>
    </thead>
    
    % for record in records:
    % if record['review_date'] and record['reviewer'] and record['timer']:
    <tr>
        <td data-player>${record['player']}</td>
        <td data-raid><a href="${record['video_link']}" target="_blank" noreferrer/>${record['raid']}</a></td>
        <td data-pals>${record['pals']}</td>
        <td data-strategy>
            % for uses in record['strategy']:
            <span>${uses}</span>
            % endfor
        </td>
        <td>${record['timer']}</td>
        <td>${record['submit_date']}</td>
        <td>${record['review_date']}</td>
    </tr>
    % endif
    % endfor

    <tfoot>
        <tr>
            <td colspan="8">Last publishing date: ${publish_date}</td>
        </tr>
    </tfoot>
</table>
