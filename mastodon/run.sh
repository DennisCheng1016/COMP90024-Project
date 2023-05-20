sudo apt-get update && install git python3 python3-pip ansible
sudo mkdir /etc/ansible
echo 'localhost' | sudo tee /etc/ansible/hosts
sudo ansible-playbook -c local setup-harvest.yaml