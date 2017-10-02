package filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import model.User;

public class GeneralFilter implements Filter{

	private static Logger logger = Logger.getLogger(GeneralFilter.class);
	
	@Override
	public void destroy() {
		Filter.super.destroy();
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		User u = (User) req.getSession().getAttribute("sessionuser");
		if (u==null) {
			logger.info("user null so we need to redirect");
			res.sendRedirect("/RFT/login.jsf");
		}else{
			logger.info("user was found " + u.getUserName() + " dofilter()");
			chain.doFilter(request, response);
		}
		
		
	}
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {}
	
}
