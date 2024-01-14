from django.db import models

from audioop import reverse


class Cust(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя")
    phone = models.CharField(max_length=15, verbose_name="Телефон")
    avto = models.CharField(max_length=100, verbose_name="Автомобиль")
    pub_date = models.DateTimeField(verbose_name="Дата")
    time_create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
class UserMessage(models.Model):
    name = models.CharField(max_length=50, verbose_name='Имя')
    email = models.EmailField(verbose_name='Email', blank=True)
    phone = models.CharField(max_length=15, verbose_name='Телефон', blank=True)
    message = models.TextField(verbose_name='Сообщение')
    is_read = models.BooleanField(default=False,verbose_name="Статус")
    time_created = models.DateTimeField(auto_now_add=True, verbose_name="Время создания")
    time_updated = models.DateTimeField(auto_now=True, verbose_name="Время прочтения")
    
    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('mess', kwargs={'mess_id': self.pk})
    
    class Meta:
        verbose_name = 'Сообщения'
        verbose_name_plural = 'Сообщения'



class Page(models.Model):
    title = models.CharField(max_length=100,verbose_name="Название страницы")
    body = models.TextField(verbose_name="Контент")

    
    def __str__(self):
        return self.title
    