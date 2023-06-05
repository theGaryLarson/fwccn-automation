const Swatch = ({ className, label }) => {
    return (
        <div className="flex items-center mr-4">
            <div className={`w-6 h-6 rounded-full border-2 border-black ${className}`} />
            <span className="ml-2">{label}</span>
        </div>
    );
};

export default Swatch;