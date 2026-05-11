import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Принимает заявку на запись (имя, телефон, аудитория, сообщение) и сохраняет в БД."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    audience = (body.get('audience') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not phone or not audience:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните имя, телефон и выберите программу'}),
        }

    schema = os.environ['MAIN_DB_SCHEMA']
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO " + schema + ".leads (name, phone, audience, message) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, audience, message or None),
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'id': lead_id}),
    }
