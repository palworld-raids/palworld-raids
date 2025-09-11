
<table>
    <thead>
        <tr>                         
            <th>Player</th>
            <th>Raid</th>
            <th>Pals</th>
            <th>Strategy type</th>
            <th>Timer</th>
            <th>Submission date</th>
            <th>Reviewer</th>
            <th>Review date</th>
        </tr>
    </thead>
    
    % for record in records:
    % if record['review_date']:
    <tr>
        <td>${record['player']}</td>
        <td>${record['raid']}</td>
        <td>${record['pals']}</td>
        <td>${record['strategy']}</td>
        <td>${record['timer']}</td>
        <td>${record['submit_date']}</td>
        <td>${record['reviewer']}</td>
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
