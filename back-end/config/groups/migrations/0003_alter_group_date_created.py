# Generated by Django 4.2.2 on 2023-06-27 08:38

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0002_alter_group_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='date_created',
            field=models.DateField(default=datetime.datetime(2023, 6, 27, 8, 38, 48, 971306)),
        ),
    ]
