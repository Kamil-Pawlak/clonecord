import { ModalFields } from "../../types/modal"
import React, { createContext, useContext, useState } from "react";
import Modal from "../Modal";

type ModalConfig = {
    title: string;
    fields: ModalFields[];
    onSubmit: (data: any) => void | Promise<void>;
    description?: string;
}

type ModalContextType = {
    openModal: (config: ModalConfig) => void;
    closeModal: () => void;
    isModalOpen: boolean;
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (config: ModalConfig) => {
        setModalConfig(config);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalConfig(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
            {children}
            {isModalOpen && modalConfig && (
                <Modal
                    title={modalConfig.title}
                    fields={modalConfig.fields}
                    onSubmit={modalConfig.onSubmit}
                    onClose={closeModal}
                />
            )}
        </ModalContext.Provider>
    );
}

function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}

export { ModalProvider, useModal };