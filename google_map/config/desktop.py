# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Google Map",
			"color": "blue",
			"icon": "fa fa-map-marker",
			"type": "module",
			"label": _("Google Map")
		}
	]
