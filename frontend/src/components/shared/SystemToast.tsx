import React from 'react';
import { Dispatch } from "react"
import { ToastContainer, Toast } from "react-bootstrap"

const SystemToast: React.FC<{setShowToast: Dispatch<any>, showToast: any}> = ({setShowToast, showToast}) => {

    return (<ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={() => setShowToast({ condition: false, type: '', message: '' })} show={showToast.condition} delay={3000} autohide bg={showToast.type}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">{showToast.message}</strong>
            </Toast.Header>
        </Toast>
    </ToastContainer>)
}

export default SystemToast