
interface titleSessionProps {
    /*
    * @description Titulo de sessão
    */
    title?: string
    /*
    * @description Subtitulo de sessão
    */
    subtitle?: string
    /*
    * @description Spacing entry between title and subtitle
    */
    spacing?: boolean

}

const TitleSession = ({ title, subtitle, spacing }: titleSessionProps) => {
    return (
        <>
            <div className="flex flex-col w-full items-center justify-center py-4">
                <h2 className="text-1.5xl font-semibold md:text-3xl">{title}</h2>
                {spacing && <div className="min-w-60 border-b-2 border-[#ffc821] w-1/5 mb-2 mt-2"></div>}
                <p className="text-sm font-medium md:text-base">{subtitle}</p>
            </div>
        </>
    );
}

export default TitleSession;