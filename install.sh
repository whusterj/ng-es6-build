# Install system requirements
sudo apt-get update
sudo apt-get install gcc python3-dev virtualenvwrapper -y

# Set up virtualenvwrapper
if ! grep -Fxq "export WORKON_HOME=$HOME/.virtualenvs" ~/.bashrc; then
    echo "export WORKON_HOME=$HOME/.virtualenvs" >> ~/.bashrc
fi
if ! grep -Fxq "source /usr/share/virtualenvwrapper/virtualenvwrapper.sh" ~/.bashrc; then
    echo "source /usr/share/virtualenvwrapper/virtualenvwrapper.sh" >> ~/.bashrc
fi

# Make the virtualenv
source /usr/share/virtualenvwrapper/virtualenvwrapper.sh
mkvirtualenv --python=`which python3` ng-build

# Add the ~/src/server directory to the virtualenv
source ../.virtualenvs/aspire/bin/activate
cd ~/src
add2virtualenv .

# Upgrade pip
pip install -U pip

if [ -e "py_requirements.txt" ]
then
  # Install python requirements
  pip install -r py_requirements.txt
fi

# Install latest node.js (8.1.3 as of this writing) and our app
nodeenv -p
npm install --no-bin-links
