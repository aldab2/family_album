### Running Database : 

 first ```cd object_storage``` then 

```docker run -dt  -p 9000:9000 -p 9090:9090 -v ${PWD}/data:/mnt/data  -v ${PWD}/config.env:/etc/config.env -e "MINIO_CONFIG_ENV_FILE=/etc/config.env" --name "minio"  quay.io/minio/minio server --console-address ":9090"```