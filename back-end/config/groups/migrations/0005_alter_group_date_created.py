# Generated by Django 4.2.2 on 2023-07-04 16:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groups', '0004_alter_group_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 7, 4, 16, 21, 7, 764683)),
        ),
    ]
