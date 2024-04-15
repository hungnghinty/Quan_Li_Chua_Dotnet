using System.Runtime.InteropServices;

namespace intern_project.Helper
{
    public enum ErrorType
    {
        ThanhCong,
        KhongThanhCong,
        ChuaTonTai,
        TonTai,
        DanhSachTrong,
    }
    internal class ErrorHelper
    {
        public static void Log(ErrorType et)
        {
            switch(et)
            {
                case ErrorType.ThanhCong:
                    Console.WriteLine("!!!!!Thanh Cong!!!!!");
                    break;
                case ErrorType.KhongThanhCong:
                    Console.WriteLine("!!!!!Khong Thanh Cong!!!!!");
                    break;
                case ErrorType.TonTai:
                    Console.WriteLine("!!!!!Doi Tuong Co Ton Tai!!!!!");
                    break;
                case ErrorType.ChuaTonTai:
                    Console.WriteLine("!!!!!Doi Tuong Khong Ton Tai!!!!!");
                    break;
                case ErrorType.DanhSachTrong:
                    Console.WriteLine("!!!!!Danh Sach Doi Tuong Trong!!!!!");
                    break;
            }
        }
    }
}
