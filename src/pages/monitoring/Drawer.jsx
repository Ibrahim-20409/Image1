
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
  } from "@headlessui/react";
  import { motion } from "framer-motion";
import DrawerContent from "./DrawerContent";
  
  const Drawer = ({ isOpen, onClose }) => {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-10">
        {/* Click outside (backdrop) closes the drawer */}
        <DialogBackdrop 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        />
  
        <div className="fixed inset-0 flex justify-end">
          {/* Animated Drawer Panel */}
          <DialogPanel className="w-[500px] h-full">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: isOpen ? "0%" : "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full bg-white shadow-xl mt-12"
            >
  
  
              {/* Drawer Content */}
              {/* <div className="p-4">
                <h2 className="text-lg font-semibold">Smooth Drawer</h2>
                <p className="text-gray-600">Click outside to close!</p>
              </div> */}
              <DrawerContent />
            </motion.div>
          </DialogPanel>
        </div>
      </Dialog>
    );
  };
  
  export default Drawer;