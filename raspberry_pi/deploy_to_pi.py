import subprocess
import sys
import os

def deploy_via_ssh(ip_address, username, source_file, remote_path):
    """
    Deploys a file to the Raspberry Pi using SCP.
    """
    print(f"Deploying {source_file} to {username}@{ip_address}:{remote_path}...")
    
    # Construct the scp command
    # ensuring we use the local scp executable
    scp_command = [
        "scp",
        source_file,
        f"{username}@{ip_address}:{remote_path}"
    ]
    
    try:
        # Run the scp command
        # This will prompt for a password if SSH keys are not set up
        subprocess.run(scp_command, check=True)
        print("Deployment successful!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Deployment failed: {e}")
        return False
    except FileNotFoundError:
        print("Error: 'scp' command not found. Please ensure OpenSSH Client is installed.")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python deploy_to_pi.py <ip_address> <username> [remote_path]")
        print("Example: python deploy_to_pi.py 192.168.1.100 pi")
        sys.exit(1)
        
    ip = sys.argv[1]
    user = sys.argv[2]
    remote_dir = sys.argv[3] if len(sys.argv) > 3 else "/home/pi/"
    
    # Path to the hello_world.py file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    source = os.path.join(script_dir, "hello_world.py")
    
    if not os.path.exists(source):
        print(f"Error: Could not find {source}")
        sys.exit(1)
        
    deploy_via_ssh(ip, user, source, remote_dir)
