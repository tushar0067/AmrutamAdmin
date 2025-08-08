

export const OverviewSection = ({ title, children }) => (
    <div className="py-4 border-b last:border-b-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
        {children}
    </div>
);


