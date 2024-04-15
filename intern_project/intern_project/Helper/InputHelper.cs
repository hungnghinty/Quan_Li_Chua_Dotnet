namespace intern_project.Helper
{
    public class InputHelper
    {
        public static int InputInt(string msg, string err)
        {
            bool ok = true;
            int ret;
            do
            {
                Console.WriteLine(msg);
                ok = int.TryParse(Console.ReadLine(), out ret);
                if (!ok)
                {
                    Console.WriteLine(err);
                }
            } while (!ok);
            return ret;
        }
        public static int InputIntDuong(string msg, string err)
        {
            bool ok = true;
            int ret;
            do
            {
                Console.WriteLine(msg);
                ok = int.TryParse(Console.ReadLine(), out ret);
                ok = ok && ret > 0;
                if (!ok)
                {
                    Console.WriteLine(err);
                }
            } while (!ok);
            return ret;
        }
        public static double InputDouble(string msg, string err)
        {
            bool ok = true;
            double ret;
            do
            {
                Console.WriteLine(msg);
                ok = double.TryParse(Console.ReadLine(), out ret);
                if (!ok)
                {
                    Console.WriteLine(err);
                }
            } while (!ok);
            return ret;
        }
        public static string InputString(string msg, string err, int minlenght = 0, int maxlenght = int.MaxValue)
        {
            bool ok = true;
            string ret;
            do
            {
                Console.WriteLine(msg);
                ret = Console.ReadLine();
                ok = ret.Length >= minlenght && ret.Length <= maxlenght;
                if (!ok)
                {
                    Console.WriteLine(err);
                }
            } while (!ok);
            return ret;
        }
        public static DateTime InputDatetime(string msg, string err, DateTime min, DateTime max)
        {
            bool ok = true;
            DateTime ret;
            do
            {
                Console.WriteLine(msg);
                ok = DateTime.TryParse(Console.ReadLine(), out ret);
                ok = ok && ret >= min && ret <= max;
                if (!ok)
                {
                    Console.WriteLine(err);
                }
            } while (!ok);
            return ret;
        }
        public static bool InputBool(string msg, string err)
        {
            bool ok;
            string ret;
            do
            {
                Console.WriteLine(msg);
                ret = Console.ReadLine();
                ret = ret.ToLower();
                ok = ret == "nam" || ret == "nu";
                if (!ok)
                {
                    Console.WriteLine(err);
                }
            } while (!ok);
            if (ret == "nam") return true;
            else return false;
        }
        
    }
}
