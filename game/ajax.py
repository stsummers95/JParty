import json, psycopg2
from django.http import Http404, HttpResponse

def getEpisodesFromDatabase(request):
    #if request.is_ajax():
    conn = psycopg2.connect("host=localhost dbname=jclues user=jeopardyuser password=AlexTisgr8")
    cur = conn.cursor()
    cur.execute("SELECT DISTINCT season FROM clues")
    episodeLists = []
    #for x in range(0, len(cur.fetchall())):
    for x in range(0, 38):
        episodeLists.append([])
    cur.execute("SELECT DISTINCT season, episode FROM clues")
    for ep in cur.fetchall():
        if ep[0] == -1:
            episodeLists[7].append(ep)
        elif ep[0] >= 7:
            episodeLists[ep[0]+1].append(ep)
        else:
            episodeLists[ep[0]].append(ep)
    for season in episodeLists:
        season.sort()
    data = json.dumps(episodeLists)
    return HttpResponse(data, content_type='application/json')
    #else:
        #raise Http404
