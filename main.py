import argparse
import asyncio
import logging
import os
import pathlib
import requests
from mako.template import Template
from mako.lookup import TemplateLookup
from datetime import datetime

logger = logging.getLogger()

parser = argparse.ArgumentParser()
parser.add_argument("-t", "--template", default="template/records.mako", type=pathlib.Path)
parser.add_argument("-s", "--script", default="template/static/script.js", type=pathlib.Path)
parser.add_argument("-o", "--output", default="records.html", type=pathlib.Path)
parser.add_argument("-d", "--data", default=None)


async def main():
    args = parser.parse_args()
    data_url = args.data or os.environ["DATA"]

    res = requests.get(data_url)
    print(res.text)

    data = []
    i = 0
    rows = res.text.split("\r\n")
    for row in rows: 
        row_data = row.split("\t")
        i += 1
        if i > 1: 
            data.append({
                'player': row_data[0],
                'raid': row_data[1],
                'video_link': row_data[2],
                'pals': row_data[3],
                'strategy': row_data[4].split(',') if row_data[4] != '' else [],
                'timer': row_data[5],
                'submit_date': row_data[6],
                'reviewer': row_data[7],
                'review_date': row_data[8],
                'game_version': row_data[9],
            })
    
    
    template_lookup = TemplateLookup(directories=['template'])

    template = Template(args.template.read_text(), lookup=template_lookup)
    rendered = template.render(records=data, publish_date=datetime.now().isoformat(), script_content=args.script.read_text())
    args.output.write_text(rendered)

if __name__ == "__main__":
    asyncio.run(main())
