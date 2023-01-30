#!/usr/bin/env python
import requests
response = requests.get('https://www.example.com')
print(response.content)
