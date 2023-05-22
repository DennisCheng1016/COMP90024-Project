#!/bin/bash
# Update system
sudo apt update -y

# Install zsh
sudo apt install zsh -y

# Install oh my zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install powerline fonts
sudo apt-get install fonts-powerline -y

# Install powerlevel10k for Oh my zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# Setup .zshrc
cat << 'EOF' > ~/.zshrc
# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"



POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(context dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status root_indicator background_jobs history time)
POWERLEVEL9K_CONTEXT_DEFAULT_BACKGROUND='017'
POWERLEVEL9K_CONTEXT_DEFAULT_FOREGROUND='231'
POWERLEVEL9K_RAM_BACKGROUND='025'
POWERLEVEL9K_RAM_FOREGROUND='231'
POWERLEVEL9K_DIR_HOME_BACKGROUND='248'
POWERLEVEL9K_DIR_HOME_FOREGROUND='000'
POWERLEVEL9K_DIR_HOME_SUBFOLDER_BACKGROUND='248'
POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND='000'
POWERLEVEL9K_DIR_DEFAULT_BACKGROUND='217'
POWERLEVEL9K_DIR_DEFAULT_FOREGROUND='000'
POWERLEVEL9K_DIR_ETC_BACKGROUND='160'
POWERLEVEL9K_DIR_ETC_FOREGROUND='231'
POWERLEVEL9K_STATUS_OK_BACKGROUND='039'
POWERLEVEL9K_STATUS_OK_FOREGROUND='000'
POWERLEVEL9K_CONTEXT_TEMPLATE='ubuntu'
POWERLEVEL9K_SHORTEN_DIR_LENGTH=2
EOF

# Source .zshrc
source ~/.zshrc

# Setup .tmux.conf
cat << 'EOF' > ~/.tmux.conf
# Set default shell of tmux
set-option -g default-shell /bin/zsh


# Remap prefix from 'C-b' to 'C-a'
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# Reload config file (change file location to your the tmux.conf you want to use)
bind r source-file ~/.tmux.conf

# Switch panes using Alt-arrow without prefix
bind -n M-h select-pane -L
bind -n M-j select-pane -D
bind -n M-k select-pane -U
bind -n M-l select-pane -R

# Enable mouse mode (tmux 2.1 and above)
set -g mouse on

# vim
set-option -g mode-keys vi


set-option -s set-clipboard off

bind P paste-buffer

bind-key -T copy-mode-vi v send-keys -X begin-selection

bind-key -T copy-mode-vi y send-keys -X rectangle-toggle

unbind -T copy-mode-vi Enter

#bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel 'xclip -se c -i'

#bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel 'xclip -se c -i'


bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy"

# Resize pane
bind -n M-Left resize-pane -L 1
bind -n M-Right resize-pane -R 1
bind -n M-Up resize-pane -U 1
bind -n M-Down resize-pane -D 1
EOF

# Source .tmux.conf
tmux source-file ~/.tmux.conf

# Install ansible, python3, and python3-pip
sudo apt-get install python3 python3-pip ansible -y

# Configure ansible
echo 'localhost' | sudo tee /etc/ansible/hosts

# Setup setup-docker.yaml
cat << 'EOF' > setup-docker.yaml
---
- hosts: 127.0.0.1
  become: yes
  vars:
    mastodon_base_path: "/home/ubuntu/mastodon"
  tasks:

  - name: Remove existing Docker packages
    apt:
      name: 
        - docker
        - docker-engine
        - docker.io
        - containerd
        - runc
      state: absent

  - name: Install prerequisite packages
    apt:
      name: 
        - ca-certificates
        - curl
        - gnupg
      state: present

  - name: Create the directory for Docker keyring
    file:
      path: /etc/apt/keyrings
      state: directory
      mode: '0755'

  - name: Download Docker's official GPG key and move it to the keyring directory
    shell:
      cmd: curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  - name: Change permission of Docker keyring
    file:
      path: /etc/apt/keyrings/docker.gpg
      mode: '0644'

  - name: Add Docker's APT repository
    shell:
      cmd: |
        echo \
        "deb [arch=\"$(dpkg --print-architecture)\" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        jammy stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  - name: Update apt cache
    apt:
      update_cache: yes

  - name: Install Docker
    apt:
      name: 
        - docker-ce
        - docker-ce-cli
        - containerd.io
        - docker-buildx-plugin
        - docker-compose-plugin
      state: present

  - name: Ensure Docker service is running
    systemd:
      name: docker
      state: started
      enabled: yes

EOF

# Run the Ansible Playbook
sudo ansible-playbook -c local setup-docker.yaml
