from django import forms
from .models import *
from captcha.fields import CaptchaField

class AddMessageForm(forms.ModelForm):
    captcha = CaptchaField()
    class Meta:
        model = UserMessage
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder':'Ваше имя','class': 'form-control form-value text-box single-line'}),
            'email': forms.EmailInput(attrs={'placeholder':'E-mail','class': 'form-control form-value text-box single-line'}),
            'phone': forms.TextInput(attrs={'placeholder':'Телефон','class': 'form-control form-value text-box single-line'}),
            'message': forms.Textarea(attrs={'placeholder':'Сообщение','class':'form-control form-value','cols': 20, 'rows': 4}),
            
            
        }