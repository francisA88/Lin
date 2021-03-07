from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, FileResponse
from django.views.decorators.csrf import ensure_csrf_cookie

import json
from .solver import *
# Create your views here.
def mainpage(request):
  return render(request, 'index.html')

def favicon(request):
  return FileResponse(open('../staticfiles/Linicon.jpg', 'rb'))
  
@ensure_csrf_cookie
def computeResults(request):
  if not request.headers.get('X-Requested-With') == 'XMLHttpRequest':
    return JsonResponse({})
  eqns = json.load(request)['equations']
  if list(filter(lambda x: not bool(x.replace(" ",'')), eqns)):
    return JsonResponse({'error':'Empty equation detected'})
  solver = solveFromExpressions(eqns)
  first_eqn_vars = split(eqns[0])['vars']
  res = {'solution':[], 'error':'', 'vars':[]}
  for eqn in eqns[1:]:
    if split(eqn)['vars' ] != first_eqn_vars:
      res['error'] = 'Different set of variables detected'
      break
  else:
    res['vars'] = first_eqn_vars
  if type(solver) == str:
    res['error'] = solver
  elif type(solver) == list:
    res['solution'] = solver
    
  return JsonResponse(res)
