import React from "react";
import TextInput from "../Input/TextInput";
import useUpdateUser from "../../Utils/useUpdateUser";
import { motion } from "framer-motion";
import { SiMaildotru } from "react-icons/si";
import { FaRegUser } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";


interface UserInfoModalProps {
  closeModal: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ closeModal }) => {
  const { formData, setFormData, handleSubmit } = useUpdateUser();

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center z-20 bg-light_bg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <Toaster /> */}
      <div className="relative bg-light_bg dark:bg-dark_bg2 w-2/4 p-6 border-t border-light_border dark:border-dark_border rounded-lg shadow-md">
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-red-600 border-2 border-light_border rounded-full flex justify-center items-center"
          onClick={closeModal}
        >
          <p className="text-white font-bold text-center">X</p>
        </button>
        <div className="flex justify-center items-center p-4 font-semibold text-xl dark:text-txtWhite">
          Edit your profil
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <TextInput
                label="Firstname"
                type="text"
                placeholder=" "
                icon={<FaRegUser />}
                value={formData.firstname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <TextInput
                label="Lastname"
                type="text"
                placeholder=" "
                icon={<FaRegUser />}
                value={formData.lastname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <TextInput
                label="Username"
                type="text"
                placeholder=" "
                icon={<FaRegUser />}
                value={formData.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <TextInput
                label="Email"
                type="email"
                placeholder=" "
                icon={<SiMaildotru />}
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <TextInput
              label="Bio"
              type="text"
              placeholder=" "
              icon={<TbNotes />}
              value={formData.bio}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-purpleButton text-white font-semibold px-6 py-3 rounded-md mr-6"
            >
              Save
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoModal;
