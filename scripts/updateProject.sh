echo "updating..."

ssh kop << EOF
    bash -l -c "
        echo "Going to directory..."
        cd /var/www/test-ff.kopbankasso.co.in
        echo "Pulling new code..."
        git pull
        echo "Done pulling code..."

        echo "Restarting server..."
        pm2 restart test-ff
        pm2 save
    "
EOF

echo "Done updating..."

