# Generated by Django 4.2.2 on 2023-06-29 05:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0003_alter_group_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='date_created',
            field=models.DateField(default=datetime.datetime(2023, 6, 29, 5, 41, 12, 720188)),
        ),
    ]
