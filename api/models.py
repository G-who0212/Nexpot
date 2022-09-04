from pickle import TRUE
from tkinter import CASCADE
from unittest.util import _MAX_LENGTH
from django.db import models

class Places(models.Model):
    idx = models.IntegerField()
    videoid = models.ForeignKey('Youtube', models.DO_NOTHING, related_name='places', db_column='videoID')
    placeid = models.CharField(db_column='placeID', primary_key=True, max_length=12)
    pname = models.CharField(max_length=20)
    paddress = models.CharField(max_length=50)
    px = models.FloatField(db_column='pX')
    py = models.FloatField(db_column='pY')
    
    class Meta:
        managed = True
        db_table = 'places'


class Youtube(models.Model):
    videoid = models.CharField(db_column='videoID', primary_key=True, max_length=11)
    channelname = models.CharField(max_length=15)
    region = models.CharField(max_length=10, blank=True, null=True)
    region1 = models.CharField(max_length=10, blank=True, null=True)
    region2 = models.CharField(max_length=10, blank=True, null=True)
    title = models.CharField(max_length=100)
    thumbnail = models.CharField(max_length=48, blank=True, null=True)
    youtime = models.DateField()
    views = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'youtube'
        
class Score(models.Model):
    placeid = models.ForeignKey('Places', db_column='placeID', related_name='score', on_delete=models.CASCADE, primary_key=True)
    lenreview = models.IntegerField()
    service = models.DecimalField(max_digits=3, decimal_places=2)
    atmosphere = models.DecimalField(max_digits=3, decimal_places=2)
    cost = models.DecimalField(max_digits=3, decimal_places=2)
    visit = models.DecimalField(max_digits=3, decimal_places=2)
    taste = models.DecimalField(max_digits=3, decimal_places=2)
    
    class Meta:
        managed = True
        db_table = 'score'