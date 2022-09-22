import { Image, Stack } from "react-bootstrap";
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from "react";
import ReactPlayer from "react-player";

export const ShowMediaFile = ({mode, file, url, setFiles}) => {

    let urls;

    if (mode === 'file') {
        urls = window.URL.createObjectURL(file.file);
    } else if (mode === 'link') {
        urls = url;
    };

    // const onDelete = (id) => {
    //     dispatch(delMediaFromFileServer(currentUrlFs));
    //     dispatch(setCurrentUrlFs(''));
    //     if (mode === file) {
    //         setFiles({
    //             blob: {
    //                 name: null,
    //                 size: null,
    //                 type: null,
    //                 lastModified: null,
    //                 lastModifiedDate: null,
    //                 webkitRelativePath: null 
    //             },
    //             file: null
    //         });
    //     }
    //     if (mode === 'link') {
    //         dispatch(deleteMediaFile(id));
    //     }

    // }
           
    return (
        <Stack direction="horizontal" gap={4}>
            <Stack gap={2} >
                {/* <div > 
                    <a href={urls}>
                        Filename: { file.blob.name }
                    </a>
                </div>
                <div>Filetype: {file.blob.type}</div>
                <div>Size in bytes: {file.blob.size}</div>
                <div>
                    lastModifiedDate:{' '}
                    {file.blob.lastModifiedDate}
                </div> */}
                {/* {!file?
                    <Button 
                        variant="outline-secondary" 
                        id="button-addon2"
                        style={{display: url !== ''?  "block" : "none"}}
                        onClick={() => onDelete(file.id)}>
                        Delete File
                    </Button> : null
                } */}
            </Stack>
            <Stack>
                <FileTypeSelector url={urls} type={file.type} />
            </Stack>
        </Stack>
    )
}

export const FileTypeSelector = ({ url, type }) => {
    
    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ( {numPages} ) => {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
      
    function previousPage() {
    changePage(-1);
    }
    
    function nextPage() {
    changePage(1);
    }

    if (!url) return null;

    switch (type) {
        case 'image/jpeg':
            return (<Image 
                src={url}
                className='img-thumbnail'
                alt='...'
                style={{ maxWidth: '24rem' }} />
            )
            case 'image/gif':
            return (<Image 
                src={url}
                className='img-thumbnail'
                alt='...'
                style={{ maxWidth: '24rem' }} />
            )
        case 'image/png':
            return (<Image 
                src={url}
                className='img-thumbnail'
                alt='...'
                style={{ maxWidth: '24rem' }} />)
        case 'video/quicktime' || 'video/mp4':
            return <ReactPlayer controls url={url} />
        case 'video/mp4':
            return <ReactPlayer controls url={url} />
        case 'application/pdf':
            return (
                <>
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <div>
                        <div className="pagec">
                            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                        </div>
                        <div className="buttonc">
                            <button
                                type="button"
                                disabled={pageNumber <= 1}
                                onClick={previousPage}
                                className="Pre">
                                Previous
                            </button>
                            <button
                                type="button"
                                disabled={pageNumber >= numPages}
                                onClick={nextPage}>
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )
        default: return null;
            
    }
}