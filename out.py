import urllib.request, json
url = 'https://huggingface.co/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification/raw/main/config.json'
c = json.loads(urllib.request.urlopen(url).read().decode())
labels = list(c.get('id2label', {}).values())
print('NEW_MAP = {')
for x in labels:
    print(f'    "{x}": "{x}",')
print('}')
