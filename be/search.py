import urllib.request, json, re
import urllib.parse
def get_image(query):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'//external-content\.duckduckgo\.com/iu/\?u=([^&\"\']+)', html)
        if match:
            return urllib.parse.unquote(match.group(1))
    except Exception as e:
        print(e)
    return ''

print('PVC_21:', get_image('ống nhựa pvc bình minh phi 21'))
print('PVC_27:', get_image('ống nhựa pvc bình minh phi 27'))
print('Van:', get_image('van khóa nước phi 21 tay gạt'))
print('CB:', get_image('cb tép panasonic 1p 20a'))
print('Wire:', get_image('dây điện cadivi 2.5 cuộn 100m'))
