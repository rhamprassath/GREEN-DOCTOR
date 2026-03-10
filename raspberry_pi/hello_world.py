import platform
import socket
import time

def get_ip_address():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
        s.close()
        return ip_address
    except Exception:
        return "127.0.0.1"

def main():
    print(f"Hello, World! Running on {platform.system()} ({platform.machine()})")
    print(f"Hostname: {socket.gethostname()}")
    print(f"IP Address: {get_ip_address()}")
    
    while True:
        print("Pi is running... Press Ctrl+C to stop.")
        time.sleep(5)

if __name__ == "__main__":
    main()
