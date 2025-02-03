KEYPATH=~/Documents/Keys/cartplus
USERNAME=askansh
HOSTNAME=cartplus.appvertix.com
CPATH=~/personal/appvertix/dist
RPATH=/var/www/appvertix

npm run build
ssh -i $KEYPATH $USERNAME@$HOSTNAME 'sudo rm -rf '$RPATH'/*'
scp -i $KEYPATH -r $CPATH/.htaccess $USERNAME@$HOSTNAME:$RPATH
scp -i $KEYPATH -r $CPATH/* $USERNAME@$HOSTNAME:$RPATH
