
echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r dist/* root@68.183.183.140:/var/www/html/

echo "Done!"