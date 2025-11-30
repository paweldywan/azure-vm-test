require('dotenv').config();
const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

// Resolve SSH key path (handle ~ for home directory)
const sshKeyPath = process.env.SSH_KEY_PATH.replace('~', process.env.HOME || process.env.USERPROFILE);

const config = {
    host: process.env.VM_HOST,
    port: 22,
    username: process.env.VM_USER,
    privateKey: fs.readFileSync(path.resolve(sshKeyPath))
};

console.log('🔌 Azure VM Connection Test');
console.log('============================');
console.log(`Host: ${config.host}`);
console.log(`User: ${config.username}`);
console.log();

const conn = new Client();

conn.on('ready', () => {
    console.log('✅ SSH Connection established successfully!\n');
    
    // Run a simple command to test the VM
    conn.exec('hostname && uname -a && uptime', (err, stream) => {
        if (err) {
            console.error('❌ Command execution failed:', err.message);
            conn.end();
            return;
        }
        
        console.log('📊 VM Information:');
        console.log('------------------');
        
        stream.on('data', (data) => {
            console.log(data.toString());
        });
        
        stream.on('close', (code) => {
            console.log(`\n✅ Test completed (exit code: ${code})`);
            conn.end();
        });
        
        stream.stderr.on('data', (data) => {
            console.error('STDERR:', data.toString());
        });
    });
});

conn.on('error', (err) => {
    console.error('❌ Connection failed:', err.message);
    console.log('\n💡 Tips:');
    console.log('   1. Make sure the VM is running');
    console.log('   2. Update VM_HOST in .env with your VM\'s public IP');
    console.log('   3. Run: npm run get-ip to get your VM\'s IP address');
    console.log('   4. Ensure SSH port 22 is open in the VM\'s network security group');
    process.exit(1);
});

conn.connect(config);
