<h3>Setting Up the archive_data.py Script as a Cron Job</h3>

1. Open the crontab editor

```
crontab -e
```
2. Add the following line to run the script on the hour:
```
0 * * * * /usr/bin/python3 /path/to/your/project/archive_data.py
```

3. Save and exit the editor.

4. Verify the cron job is set:
```
crontab -l
```