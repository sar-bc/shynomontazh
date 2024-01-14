from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render, redirect
from .forms import *
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cust
from django.core.mail import send_mail
from django.conf import settings
from datetime import date
from . import vremya
import datetime

#########################################################################################
def index(request):
    year = datetime.date.today().year
    context = {
        'title': 'Ваш Шиномантаж',
        'year': year
    }
    return render(request, 'koleso/index.html', context=context)

#########################################################################################
def services(request):
    year = datetime.date.today().year
    context = {
        'title': 'Ваш Шиномантаж',
        'year': year
    }
    return render(request, 'koleso/services.html', context=context)

#########################################################################################
def price(request):
    year = datetime.date.today().year
    context = {
        'title': 'Ваш Шиномантаж',
        'year': year
    }
    return render(request, 'koleso/price.html', context=context)
#########################################################################################
def contact(request):
    
    if request.method == 'POST':
        form = AddMessageForm(request.POST)
        if form.is_valid():
            # print(form.cleaned_data)
            x = request.POST.dict()
            form.save()
            mess = "Новое сообщение от " + x.get('name')+"; e-mail: "+x.get('email')+"; Тел: "+x.get('phone')+"; Сообщение: "+x.get('message')
            # print(mess)
            send_mail('Уведомление с сайта Шиномонтаж',mess,settings.EMAIL_HOST_USER,[settings.EMAIL_FROM_ADMIN,settings.EMAIL_FROM_CLIENT],fail_silently=False,)
            return redirect('home')
    else:
        form = AddMessageForm()
    year = datetime.date.today().year    
    context = {
        'title': 'Ваш Шиномантаж',
        'form': form,
        'year': year
    }
    return render(request, 'koleso/contact.html', context=context)
#########################################################################################
def time_admin(request):
    year = datetime.date.today().year
    context = {
        'title': 'Ваш Шиномантаж',
        'year': year
    }
    return render(request, 'koleso/time_admin.html', context=context)
#########################################################################################
class CustAPIView(APIView):
    
    def get(self, request, **kwargs):

        if kwargs:
            year = kwargs['year']
            month = kwargs['month']
            day = kwargs['day']
            param = year + "-"+ month +"-"+day
            time_busy = []
            client_lst =[]
            zapros = Cust.objects.filter(pub_date__date=param).order_by('pub_date').values()
            
            for busy in zapros:
                # print(busy['pub_date'].strftime('%H:%M'))
                time_busy.append(busy['pub_date'].strftime('%H:%M'))
            for i in zapros:
                client_lst.append({"id":i['id'],"name":i['name'],"phone":i['phone'],"avto":i['avto'],"time":i['pub_date'].strftime('%H:%M')}) 

            return Response({"date": param,"date_max":vremya.date_max,"time_all":vremya.time_all,"time_busy":time_busy,"client":client_lst})
        else:
            # print(date.today())
            time_busy = []
            client_lst =[]
            zapros = Cust.objects.filter(pub_date__date=date.today()).order_by('pub_date').values()
            for busy in zapros:
                # print(busy['pub_date'].strftime('%H:%M'))
                time_busy.append(busy['pub_date'].strftime('%H:%M'))

            for i in zapros:
                client_lst.append({"id":i['id'],"name":i['name'],"phone":i['phone'],"avto":i['avto'],"time":i['pub_date'].strftime('%H:%M')})    
            # print(vremya.dni)
            # print(vremya.time_all)
            # print(vremya.date_max)
            return Response({"date": date.today(),"date_max":vremya.date_max,"time_all":vremya.time_all,"time_busy":time_busy,"client":client_lst})  
    def post(self, request):
        
        name = request.POST.get("name")
        avto = request.POST.get("avto")
        phone = request.POST.get("phone")
        data_ = request.POST.get("date")
        time_ = request.POST.get("time")
        param = str(data_)+" "+str(time_)
        # print(data_)
        # проверям есть ли запись с таким временем и датой
        m = Cust.objects.filter(pub_date=param)
        # print(len(m))
        if len(m) > 0:
            # print("запись есть")
            time_busy = []
            zapros = Cust.objects.filter(pub_date__date=data_).order_by('pub_date').values()
            for busy in zapros:
                # print(busy['pub_date'].strftime('%H:%M'))
                time_busy.append(busy['pub_date'].strftime('%H:%M'))
            return Response({'name': name,"message":"is_busy","time_all":vremya.time_all,"time_busy":time_busy})
        else:
            # print("записи нет")
            s = Cust.objects.create(name=name, phone=phone, avto=avto, pub_date=param)
            print("create:",s)
            time_busy = []
            client_lst =[]
            zapros = Cust.objects.filter(pub_date__date=data_).order_by('pub_date').values()
            for busy in zapros:
                # print(busy['pub_date'].strftime('%H:%M'))
                time_busy.append(busy['pub_date'].strftime('%H:%M'))
            for i in zapros:
                client_lst.append({"id":i['id'],"name":i['name'],"phone":i['phone'],"avto":i['avto'],"time":i['pub_date'].strftime('%H:%M')})    
            return Response({"name": name,"message":"sucsess","time_all":vremya.time_all,"time_busy":time_busy,"client":client_lst})
#########################################################################################    
class CustAPIDel(APIView):
    def get(self,request,**kwargs):
        del_ok=0
        if kwargs:
            year = kwargs['year']
            month = kwargs['month']
            day = kwargs['day']
            del_id = kwargs['del_id']
            param = year + "-"+ month +"-"+day
        # print(kwargs)
        #########
        if int(del_id) > 0:
            wd = Cust.objects.filter(pk=del_id).delete()
            # print(wd[0])
            if wd[0]:
                del_ok =1
                # print("DEL OK")
            else:
                del_ok =0   
                # print("DEL NOT")
            #########        
        time_busy = []
        client_lst =[]
        zapros = Cust.objects.filter(pub_date__date=param).order_by('pub_date').values()
            
        for busy in zapros:
            # print(busy['pub_date'].strftime('%H:%M'))
            time_busy.append(busy['pub_date'].strftime('%H:%M'))
        for i in zapros:
            client_lst.append({"id":i['id'],"name":i['name'],"phone":i['phone'],"avto":i['avto'],"time":i['pub_date'].strftime('%H:%M')}) 

        return Response({"date": param,"date_max":vremya.date_max,"time_all":vremya.time_all,"time_busy":time_busy,"client":client_lst,"del_ok":del_ok})
            
#########################################################################################   
def pageNotFound(request, exception):
   year = datetime.date.today().year
   context = {
        'title': 'Ваш Шиномантаж',
        'year': year
   }
   return render(request, 'koleso/page_not_found.html', context=context)
#########################################################################################
        