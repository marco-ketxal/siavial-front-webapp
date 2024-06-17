import React , { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    DialogActions,
    Typography,
    Tooltip
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { isMobile } from "react-device-detect";
import {
    CloseButton,
    CloseIcon,
    Container,
    RoundedButton,
    StatusButton,
    ThumbContainer,
    ThumbInner,
    Thumb,
    DeleteButton,
    DeleteIcon,
} from "./ModalSubirImagen.styles";


const ModalSubirImagen = ({ openModal, handleClose, callback}) =>{

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open,
    } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            'application/pdf':['.pdf'],
            'application/vnd.openxmlformats-':['.docx'],
           },   
        noClick: true,
        noKeyboard: true,
        multiple: false,
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFileUrl(URL.createObjectURL(acceptedFiles[0]));
            setFile(acceptedFiles[0]);
        },
    });

    const getBase64Image = async (blob) => {
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
            reader.onload = resolve;
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
        return reader.result;
    };

    const handleUploadImage = async () => {
        const b64 = await getBase64Image(file);
        callback(b64);
    };

    return (
        <Dialog maxWidth="md" fullWidth open={openModal} onClose={handleClose}>
            <DialogTitle>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h6">Subir imagen</Typography>
                    </Grid>
                    <Grid item>
                        <CloseButton onClick={handleClose}>
                            <CloseIcon className="fas fa-times" />
                        </CloseButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                {isMobile ? (
                    <Grid container justify="center" className="mb-2">
                        <input {...getInputProps()} />
                        <Grid item>
                            <RoundedButton
                                variant="outlined"
                                color="primary"
                                onClick={open}
                            >
                                Seleccionar archivo (menor a 5MB)
                            </RoundedButton>
                        </Grid>
                    </Grid>
                ) : (
                    <Container
                        {...getRootProps({
                            isDragActive,
                            isDragAccept,
                            isDragReject,
                        })}
                    >
                        <input {...getInputProps()} />
                        <Typography>
                            Arrastra y suelta una imagen para subirla
                        </Typography>
                        <RoundedButton
                            variant="outlined"
                            color="primary"
                            className="mt-1"
                            onClick={open}
                        >
                            Seleccionar archivo (menor a 5MB)
                        </RoundedButton>
                    </Container>
                )}
                {fileUrl && (
                    <ThumbContainer>
                        <Tooltip title="Eliminar" placement="top">
                            <DeleteButton
                                size="small"
                                onClick={() => {
                                    setFile(null);
                                    setFileUrl(null);
                                }}
                            >
                            <DeleteIcon className="fas fa-times" />
                            </DeleteButton>
                        </Tooltip>
                        <ThumbInner>
                            <Thumb src={fileUrl} />
                        </ThumbInner>
                    </ThumbContainer>
                )}
                {fileUrl && (
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        className="mt-1"
                    >
                        <Grid item>
                            <StatusButton
                                variant="contained"
                                color="primary"
                                onClick={() => handleUploadImage()}
                            >
                                Continuar
                            </StatusButton>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default ModalSubirImagen;
