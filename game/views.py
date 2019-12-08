from django.shortcuts import get_object_or_404, render

from .models import Clues

import json
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder

def index(request):
    latest_clue_list = Clues.objects.order_by('-season', '-episode', 'clue_id')[:5]
    context = { 'latest_clue_list': latest_clue_list, }
    return render(request, 'game/index.html', context)
    
    season_info = Clues.objects.distinct('season')
    season_list = []
    for val in season_info:
        season_list.append(val.season)
    context = { 'season_list': season_list }

def detail(request, episode):
    check = get_object_or_404(Clues, episode=episode, clue_id=1)
    episode = Clues.objects.filter(episode=episode)
    episode_json = serializers.serialize('json', list(episode), cls=DjangoJSONEncoder)
    return render(request, 'game/detail.html', {'episode': episode, 'episode_json': episode_json})
