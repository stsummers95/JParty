# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-11-03 08:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Clues',
            fields=[
                ('season', models.IntegerField(primary_key=True, serialize=False)),
                ('episode', models.IntegerField()),
                ('clue_id', models.IntegerField()),
                ('category', models.TextField(blank=True, null=True)),
                ('clue_text', models.TextField(blank=True, null=True)),
                ('correct_response', models.TextField(blank=True, null=True)),
                ('daily_double', models.NullBooleanField()),
            ],
            options={
                'db_table': 'clues',
                'managed': False,
            },
        ),
    ]
