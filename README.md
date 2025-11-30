# Azure VM Test

A simple project to deploy and test an Azure Virtual Machine.

## Prerequisites

- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) installed and logged in (`az login`)
- [Node.js](https://nodejs.org/) (v16 or later)

## Project Structure

```
├── deploy.ps1      # PowerShell script to create Azure resources
├── index.js        # Node.js app to test VM connectivity via SSH
├── package.json    # Node.js dependencies
├── .env            # Environment variables (not committed)
└── .gitignore      # Git ignore rules
```

## Deployment

1. **Deploy the Azure VM:**

   ```powershell
   .\deploy.ps1
   ```

   This script will:
   - Create a resource group named `MyResourceGroup` in `eastus`
   - Create a `Standard_B1s` Ubuntu VM named `MyVM`
   - Generate SSH keys for secure access

2. **Get the VM's public IP address:**

   ```powershell
   npm run get-ip
   ```

3. **Update the `.env` file** with your VM's IP:

   ```
   VM_HOST=<your-vm-public-ip>
   VM_USER=azureuser
   SSH_KEY_PATH=~/.ssh/id_rsa
   ```

## Testing the VM

1. **Install dependencies:**

   ```powershell
   npm install
   ```

2. **Run the test application:**

   ```powershell
   npm start
   ```

   The app connects to your VM via SSH and displays system information.

## Cleanup

To avoid ongoing charges, delete the resource group when done:

```powershell
az group delete --name MyResourceGroup --yes --no-wait
```

## Troubleshooting

- **Connection refused**: Ensure the VM is running and port 22 is open in the Network Security Group
- **Permission denied**: Verify the SSH key path in `.env` matches your generated key
- **Host not found**: Double-check the `VM_HOST` value in `.env`
