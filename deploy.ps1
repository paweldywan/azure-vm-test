# Create resource group first
az group create --name MyResourceGroup --location eastus

# Set defaults
az configure --defaults group=MyResourceGroup location=eastus

# Create VM (note: UbuntuLTS is deprecated, using Ubuntu2204)
az vm create --resource-group MyResourceGroup --name MyVM --image Ubuntu2204 `
    --size Standard_B1s `
    --admin-username azureuser `
    --generate-ssh-keys